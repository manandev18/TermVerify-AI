# TermVerify AI

**TermVerify AI** is an intelligent term sheet validation platform powered by advanced AI technology. It automates the validation process, providing real-time fraud detection, risk scoring, and percentage matching to ensure accuracy and compliance.

## Features
- **AI-Powered Extraction**: Automatically extracts relevant data points from term sheets.
- **Validation**: Cross-checks extracted data against industry standards.
- **Fraud Detection**: Identifies potential fraudulent activities with risk scoring.
- **Email Integration**: Sends notifications on validation status and results.
- **User Authentication**: Secure login and signup functionality.

## Project Structure
```
Barclays/
├── Backend/
│   ├── config/          # Database configuration
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── Scraping/        # Python scripts for data extraction
│   ├── .env             # Environment variables (not tracked by Git)
│   ├── index.js         # Entry point for the backend
│   └── package.json     # Backend dependencies
├── Frontend/
│   ├── home.html        # Landing page
│   ├── loginpage.html   # Login and signup page
│   ├── upload_termsheet.html # Term sheet upload page
│   └── styles/          # CSS styles (if applicable)
└── .gitignore           # Git ignore file
```

## Prerequisites
- **Node.js**: Install [Node.js](https://nodejs.org/).
- **MongoDB**: Set up a MongoDB database.
- **Python**: Install Python 3.x for running the data extraction scripts.

## Installation

### Backend
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory with the following variables:
   ```
   MONGO_URI=<your-mongodb-uri>
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=<your-jwt-secret>
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend
1. Open the `Frontend` directory.
2. Serve the HTML files using a local server or open them directly in a browser.

## API Endpoints

### Authentication
- **POST** `/api/auth/signup`: Create a new user.
- **POST** `/api/auth/login`: Authenticate a user and return a JWT.

### Term Sheet Extraction
- **POST** `/api/extract`: Upload a term sheet document for AI processing.

## Python Script
The Python script `excel_extract.py` in the `Scraping` folder processes uploaded term sheets, extracts relevant data, and appends it to an Excel file.

## Usage
1. Start the backend server.
2. Open the `Frontend/home.html` file in a browser.
3. Navigate to the upload page and upload a term sheet document.
4. The backend processes the document and returns the extracted data.

## Development
### Running the Backend
```bash
cd Backend
npm run dev
```

### Running the Frontend
Open the HTML files in the `Frontend` directory in your browser.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the Apache 2.0 License.

## Contact
For any inquiries, please contact:
- **Email**: manan.andraskar22@spit.ac.in
- **Phone**: 8530837267
