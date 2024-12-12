# MSGme - A Chat Web Application

MSGme is a feature-rich, real-time chat web application designed for seamless and secure communication. Built with modern web technologies, MSGme offers a fast and interactive user experience for messaging and collaboration.


## Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (v14)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [Flowbite](https://flowbite.com/)
- **State Management**: Redux and @tanstack/react-query

### Backend
- **Chat Service**: Node.js with MongoDB using Socket.io
- **User Service**: Next.js with PostgreSQL using Prisma ORM


### Database
- **Relational**: PostgreSQL (User and relations management)
- **NoSQL**: MongoDB (Message storage)

## Installation


### Frontend Setup -
 [Click here](https://github.com/MSGme-organization/MSGme_Web/blob/main/README.md)

### Backend Setup -
1. Clone the repository:
   ```bash
   git clone https://github.com/MSGme-organization/MSGme-backend.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd MSGme-backend
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
    ```env
    DATABASE_URL="Mongodb database url"
    ```
5. Start the server:
   ```bash
   npm run dev
   ```