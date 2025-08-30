export class TestDataGenerator {
 // Generate random string of specific length
 static generateRandomString(length: number): string {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   let result = '';
   for (let i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return result;
 }


 // Generate random alphanumeric string
static generateRandomAlphanumeric(length: number): string {
 const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 let result = '';
 for (let i = 0; i < length; i++) {
   result += characters.charAt(Math.floor(Math.random() * characters.length));
 }
 return result;
}


 // Generate random integer between min and max (inclusive)
 static generateRandomInteger(min: number, max: number): number {
   return Math.floor(Math.random() * (max - min + 1)) + min;
 }


 // Generate random email
 static generateRandomEmail(): string {
   const username = this.generateRandomAlphanumeric(8);
   const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'];
   const randomDomain = domains[Math.floor(Math.random() * domains.length)];
   return `${username}@${randomDomain}`;
 }


 // Generate random phone number
 static generateRandomPhone(): string {
   return `+1${Array.from({length: 10}, () => Math.floor(Math.random() * 10)).join('')}`;
 }


 // Generate random date between start and end
 static generateRandomDate(start: Date, end: Date): Date {
   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
 }
}
