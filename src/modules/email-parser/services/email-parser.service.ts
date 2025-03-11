import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import { simpleParser } from 'mailparser';
import { JsonData } from '../types/json-data';

@Injectable()
export class EmailParserService {
  private readonly logger = new Logger(EmailParserService.name);

  async parseEmail(emailPath: string): Promise<JsonData | null> {
    try {
      let emailContent: string;

      if (this.isValidUrl(emailPath)) {
        this.logger.log(`Downloading email from URL: ${emailPath}`);
        const response = await axios.get(emailPath, {
          responseType: 'arraybuffer',
        });
        emailContent = (response.data as Buffer).toString();
      } else {
        this.logger.log(`Reading email from local path: ${emailPath}`);
        if (!fs.existsSync(emailPath)) {
          throw new Error(`File not found: ${emailPath}`);
        }
        emailContent = fs.readFileSync(emailPath, 'utf-8');
      }

      const parsed = await simpleParser(emailContent);

      if (parsed.attachments.length > 0) {
        for (const attachment of parsed.attachments) {
          if (attachment.contentType === 'application/json') {
            this.logger.log(`Found JSON attachment: ${attachment.filename}`);
            return JSON.parse(attachment.content.toString()) as JsonData;
          }
        }
      }

      const body = parsed.text || parsed.html;
      if (!body || typeof body !== 'string') {
        throw new Error('Email body is empty or not a string.');
      }

      return await this.extractJsonFromLinks(body);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error parsing email: ${error.message}`);
        throw new Error(`Error parsing email: ${error.message}`);
      }
      this.logger.error('Unknown error while parsing email.');
      throw new Error('Unknown error while parsing email.');
    }
  }

  /**
   * Extract JSON from links in the email body.
   */
  private async extractJsonFromLinks(body: string): Promise<JsonData | null> {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const links = body.match(urlRegex);

    if (!links) return null;

    for (const link of links) {
      try {
        this.logger.debug(`Checking link: ${link}`);

        if (link.endsWith('.json')) {
          const response = await axios.get<JsonData>(link);
          this.logger.log(`Found direct JSON link: ${link}`);
          return response.data;
        }

        // Download page content
        const response = await axios.get<string>(link);
        const pageContent = response.data;
        const jsonLinkMatch = pageContent.match(urlRegex);

        if (jsonLinkMatch) {
          for (const jsonLink of jsonLinkMatch) {
            if (jsonLink.endsWith('.json')) {
              this.logger.log(`Found JSON link inside webpage: ${jsonLink}`);
              const jsonResponse = await axios.get<JsonData>(jsonLink);
              return jsonResponse.data;
            }
          }
        }
      } catch (err) {
        this.logger.warn(`Error fetching link: ${link} - ${err}`);
      }
    }

    return null;
  }

  /**
   * Validates if a string is a valid URL.
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
