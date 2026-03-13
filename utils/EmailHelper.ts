import { MailSlurp } from "mailslurp-client";

export class EmailHelper {
  private mailSlurp: MailSlurp;

  constructor() {
    this.mailSlurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY! });
  }

  async createInbox() {
    const inbox =
      await this.mailSlurp.inboxController.createInboxWithDefaults();
    return inbox;
  }

  async waitForLatestEmail(inboxId: string, timeout: number = 30000) {
    const email = await this.mailSlurp.waitForLatestEmail(inboxId, timeout);
    return email;
  }
}
