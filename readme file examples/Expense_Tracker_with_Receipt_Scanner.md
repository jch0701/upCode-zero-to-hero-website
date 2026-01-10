# Expense Tracker with Receipt Scanner

## Project Overview

Build an intelligent expense tracking application that leverages OCR (Optical Character Recognition) technology to automatically capture expense data from receipt photos. The app should provide seamless expense management through camera integration, automatic data extraction, smart categorization, and comprehensive financial insights to help users manage their spending effectively.

### Difficulty Level
**Intermediate to Advanced**

### Estimated Timeline
6-8 weeks

---

## Project Requirements

### Functional Requirements

1. **Receipt Scanning & OCR**
   - Camera integration for capturing receipt photos
   - Gallery import for existing receipt images
   - Image preprocessing (crop, rotate, enhance contrast)
   - OCR to extract text from receipts
   - Parse key information: total amount, date, merchant name, items
   - Multi-receipt batch scanning
   - Real-time OCR feedback during capture
   - Manual correction interface for OCR errors
   - Support for multiple receipt formats and currencies

2. **Expense Management**
   - Create, read, update, and delete expenses
   - Manual expense entry (for non-receipt expenses)
   - Attach receipt images to expenses
   - Edit extracted OCR data
   - Add expense categories (food, transport, shopping, utilities, etc.)
   - Add payment methods (cash, credit card, debit card, digital wallet)
   - Add custom tags and notes
   - Mark expenses as reimbursable
   - Split expenses between multiple categories

3. **Automatic Category Detection (Bonus)**
   - ML-based merchant categorization
   - Learn from user corrections
   - Confidence score for suggestions
   - Keyword-based fallback categorization
   - Category suggestion based on merchant name
   - Recurring merchant recognition
   - Custom category training

4. **Budget Management**
   - Set monthly/weekly budgets by category
   - Budget vs. actual spending comparison
   - Budget warnings when approaching limit
   - Percentage-based alerts (e.g., 80% of budget used)
   - Visual budget tracking
   - Rollover unused budget (optional)
   - Budget recommendations based on history

5. **Analytics & Reports**
   - Spending summary (daily, weekly, monthly, yearly)
   - Category-wise spending breakdown (pie charts)
   - Spending trends over time (line graphs)
   - Comparison across months
   - Top spending categories
   - Merchant-wise spending analysis
   - Payment method distribution
   - Export reports to PDF/CSV/Excel
   - Custom date range filtering

6. **Cloud Backup & Sync**
   - User authentication and account management
   - Cloud storage for receipts and data
   - Multi-device synchronization
   - Offline mode with sync when online
   - Data encryption in transit and at rest
   - Receipt image compression
   - Selective backup options

7. **Search & Filter**
   - Search by merchant name, amount, category
   - Filter by date range, category, payment method
   - Filter by tags and notes
   - Saved filter presets
   - Quick filters (this month, last month, this year)
   - Sort by date, amount, category

8. **Additional Features**
   - Recurring expense tracking
   - Multiple currency support
   - Currency conversion
   - Receipt image gallery
   - Tax-deductible expense marking
   - Receipt sharing (email, export)
   - Dark mode
   - Multi-language support (optional)

### Technical Requirements

- **Mobile Framework**: 
  - Flutter (recommended for cross-platform)
  - React Native
  - Native iOS (Swift) / Android (Kotlin)
- **Camera Integration**:
  - Camera Plugin (image_picker, react-native-camera)
  - Image cropping and editing libraries
  - Image compression
- **OCR Technology**:
  - **Cloud-based**: Google Vision API, AWS Textract, Azure Computer Vision
  - **On-device**: ML Kit Text Recognition, Tesseract OCR
  - **Specialized**: Taggun, Veryfi, Expensify API
- **Backend**: 
  - Node.js (Express/NestJS)
  - Python (FastAPI/Django)
  - Firebase/Supabase
- **Database**: 
  - PostgreSQL/MySQL for structured data
  - MongoDB for flexible schema
  - Firebase Firestore
- **Cloud Storage**: 
  - AWS S3, Google Cloud Storage, Azure Blob Storage
  - Cloudinary for image processing
- **ML/AI** (for category detection):
  - TensorFlow Lite
  - CoreML (iOS)
  - Cloud-based ML services
  - Natural Language Processing for merchant classification
- **Authentication**: JWT, OAuth 2.0, Firebase Auth
- **State Management**: Provider/Riverpod/Bloc (Flutter), Redux/MobX (React Native)

### Non-Functional Requirements

- **Performance**: 
  - OCR processing time < 5 seconds
  - App launch time < 2 seconds
  - Smooth image capture and preview
- **Accuracy**: 
  - OCR accuracy > 90% for clear receipts
  - Category detection accuracy > 85%
- **Usability**: 
  - Expense creation from receipt in < 30 seconds
  - Intuitive camera interface
- **Reliability**: 
  - Handle poor image quality gracefully
  - Offline functionality for core features
- **Security**: 
  - Encrypted cloud storage
  - Secure authentication
  - Privacy-compliant data handling
- **Scalability**: Support 10,000+ expenses per user
- **Accessibility**: Screen reader support, good contrast

---

## Deliverables

### 1. Project Setup & Authentication (Week 1)
- [ ] Project initialization (Flutter/React Native)
- [ ] Cloud backend setup (Firebase/custom)
- [ ] User authentication system
- [ ] Database schema design
- [ ] Navigation structure
- [ ] Basic UI screens

### 2. Manual Expense Entry (Week 2)
- [ ] Expense creation form
- [ ] Category management
- [ ] Payment method management
- [ ] Expense list view
- [ ] Expense detail view
- [ ] Edit and delete functionality
- [ ] Local data persistence

### 3. Camera & Image Capture (Week 3)
- [ ] Camera screen implementation
- [ ] Photo capture functionality
- [ ] Gallery import feature
- [ ] Image preview screen
- [ ] Image cropping tool
- [ ] Image enhancement (brightness, contrast)
- [ ] Image compression
- [ ] Receipt image storage

### 4. OCR Integration (Week 3-4)
- [ ] OCR service integration (Google Vision/ML Kit)
- [ ] API authentication and setup
- [ ] Image preprocessing pipeline
- [ ] Text extraction implementation
- [ ] Receipt parsing logic (amount, date, merchant)
- [ ] Data extraction algorithm
- [ ] OCR result display screen
- [ ] Manual correction interface
- [ ] Error handling for failed OCR

### 5. Automatic Category Detection (Week 4-5, Bonus)
- [ ] Merchant name normalization
- [ ] Category classification logic
- [ ] ML model training (if custom)
- [ ] Keyword-based categorization
- [ ] Category suggestion UI
- [ ] User feedback collection for learning
- [ ] Category confidence scoring
- [ ] Fallback categorization system

### 6. Analytics & Reports (Week 5-6)
- [ ] Dashboard with summary cards
- [ ] Category spending chart (pie/donut)
- [ ] Spending trends chart (line/bar)
- [ ] Monthly comparison view
- [ ] Budget tracking display
- [ ] Report generation system
- [ ] PDF export functionality
- [ ] CSV export functionality
- [ ] Date range picker

### 7. Cloud Sync & Advanced Features (Week 6-7)
- [ ] Cloud database integration
- [ ] Real-time data synchronization
- [ ] Receipt image cloud upload
- [ ] Offline mode handling
- [ ] Budget management system
- [ ] Budget alerts and notifications
- [ ] Search and filter implementation
- [ ] Recurring expense tracking

### 8. Testing, Polish & Documentation (Week 7-8)
- [ ] Unit tests for core functions
- [ ] Integration tests for OCR pipeline
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] User documentation
- [ ] API documentation
- [ ] Deployment preparation

### 9. Optional Enhancements
- [ ] Receipt splitting for shared expenses
- [ ] Group expense management
- [ ] Mileage tracker for travel expenses
- [ ] Bill reminders
- [ ] Investment/income tracking
- [ ] Financial goal setting
- [ ] Integration with banking APIs (Plaid)
- [ ] Smartwatch app
- [ ] Web dashboard
- [ ] Admin panel for business users

---

## Test Cases

### Test Case 1: Manual Expense Entry
**Input**: User manually adds expense: $50.00, Grocery, Walmart, today  
**Expected Output**: Expense saved and appears in expense list  
**Status**: Must Pass

### Test Case 2: Receipt Capture
**Input**: User captures clear receipt photo from camera  
**Expected Output**: Photo captured, preview shown, ready for OCR  
**Status**: Must Pass

### Test Case 3: OCR Text Extraction
**Input**: Clear receipt image with total: $42.50, date: 01/10/2026, merchant: Target  
**Expected Output**: OCR extracts all three fields with >90% accuracy  
**Status**: Must Pass

### Test Case 4: OCR Error Handling
**Input**: Blurry or dark receipt image  
**Expected Output**: System shows quality warning, suggests retake or manual entry  
**Status**: Must Pass

### Test Case 5: Category Auto-Detection
**Input**: Merchant name "Starbucks Coffee"  
**Expected Output**: System suggests "Food & Dining" category with >80% confidence  
**Status**: Should Pass (Bonus Feature)

### Test Case 6: Budget Alert
**Scenario**: User sets $500 food budget, spends $450  
**Expected Output**: Alert shows "90% of food budget used"  
**Status**: Must Pass

### Test Case 7: Monthly Analytics
**Scenario**: User has 50 expenses across 5 categories in current month  
**Expected Output**: Dashboard shows accurate category breakdown and total  
**Status**: Must Pass

### Test Case 8: Cloud Sync
**Scenario**: User adds expense on phone A, opens app on phone B  
**Expected Output**: Expense appears on phone B within 5 seconds  
**Status**: Must Pass

### Test Case 9: Offline Mode
**Scenario**: User captures receipt and adds expense while offline  
**Expected Output**: Data saved locally, syncs automatically when online  
**Status**: Must Pass

### Test Case 10: Multi-Currency Support
**Input**: Receipt in EUR (€50), user's default currency is USD  
**Expected Output**: System converts and displays both currencies  
**Status**: Should Pass

### Test Case 11: Export Report
**Input**: User exports January expenses to PDF  
**Expected Output**: PDF generated with all expenses, charts, and summary  
**Status**: Must Pass

### Test Case 12: Poor Lighting OCR
**Scenario**: Receipt photo taken in dim lighting  
**Expected Output**: Image enhancement applied, OCR attempted, fallback to manual if fails  
**Status**: Should Pass

---

## Development Hints & Tips

### Getting Started
1. **Start with Manual Entry**: Build expense CRUD before adding OCR
2. **Test OCR Early**: Try different OCR services with sample receipts
3. **Use Cloud OCR Initially**: On-device OCR can be added later
4. **Mock OCR Responses**: Don't wait for API during initial development
5. **Handle Failures Gracefully**: OCR won't be 100% accurate

### Database Schema Recommendations

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(255),
    default_currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Expenses table
CREATE TABLE expenses (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    merchant_name VARCHAR(255),
    category VARCHAR(100),
    payment_method VARCHAR(50),
    expense_date DATE NOT NULL,
    notes TEXT,
    is_reimbursable BOOLEAN DEFAULT FALSE,
    receipt_image_url TEXT,
    ocr_data JSONB, -- Store raw OCR results
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    color VARCHAR(7), -- Hex color
    icon VARCHAR(50),
    is_custom BOOLEAN DEFAULT TRUE,
    budget_amount DECIMAL(10, 2),
    budget_period VARCHAR(20) -- 'monthly', 'weekly'
);

-- Budgets table
CREATE TABLE budgets (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    category_id UUID REFERENCES categories(id),
    amount DECIMAL(10, 2) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    alert_threshold INTEGER DEFAULT 80 -- percentage
);

-- Merchants table (for category learning)
CREATE TABLE merchants (
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    normalized_name VARCHAR(255),
    suggested_category VARCHAR(100),
    confidence_score DECIMAL(3, 2),
    usage_count INTEGER DEFAULT 0,
    last_used TIMESTAMP
);

-- Tags table
CREATE TABLE tags (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    name VARCHAR(50) NOT NULL
);

-- Expense_Tags junction table
CREATE TABLE expense_tags (
    expense_id UUID REFERENCES expenses(id),
    tag_id UUID REFERENCES tags(id),
    PRIMARY KEY (expense_id, tag_id)
);
```

### Architecture Recommendations

```
Mobile App (Flutter/React Native)
    ↓
├── Presentation Layer
│   ├── Camera Screen
│   ├── Expense List
│   ├── Analytics Dashboard
│   └── Settings
│
├── Business Logic
│   ├── Expense Manager
│   ├── OCR Service
│   ├── Category Detector
│   ├── Budget Tracker
│   └── Sync Manager
│
└── Data Layer
    ├── Local Database (SQLite)
    ├── Cache Manager
    └── API Client
        ↓
    Backend API (Node.js/Python)
        ↓
    ├── Authentication Service
    ├── OCR Service (Google Vision/AWS Textract)
    ├── Image Processing Service
    ├── ML Category Service
    ├── Database (PostgreSQL)
    └── Cloud Storage (S3)
```

### Common Pitfalls to Avoid
- **Not preprocessing images**: Raw photos often fail OCR
- **Ignoring OCR confidence scores**: Always validate low-confidence results
- **Poor camera UX**: Make it easy to retake photos
- **Not compressing images**: Receipt images can consume significant storage
- **Hardcoding currencies**: Support multiple currencies from the start
- **No offline fallback**: Users need to track expenses anywhere
- **Overcomplicating categorization**: Start simple, add ML later
- **Poor error messages**: Tell users how to fix OCR failures
- **Not testing various receipt formats**: Receipts vary widely

### OCR Best Practices

```python
# Image Preprocessing Pipeline
def preprocess_receipt_image(image):
    # 1. Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # 2. Apply Gaussian blur to reduce noise
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # 3. Apply adaptive thresholding
    threshold = cv2.adaptiveThreshold(
        blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
        cv2.THRESH_BINARY, 11, 2
    )
    
    # 4. Dilate to strengthen text
    kernel = np.ones((1, 1), np.uint8)
    dilated = cv2.dilate(threshold, kernel, iterations=1)
    
    # 5. Detect and correct skew
    angle = detect_skew(dilated)
    rotated = rotate_image(dilated, angle)
    
    return rotated

# Receipt Parsing Logic
def parse_receipt_text(ocr_text):
    data = {
        'total': None,
        'date': None,
        'merchant': None,
        'items': []
    }
    
    # Extract total using regex patterns
    total_patterns = [
        r'total[:\s]+\$?(\d+\.\d{2})',
        r'amount[:\s]+\$?(\d+\.\d{2})',
        r'balance[:\s]+\$?(\d+\.\d{2})'
    ]
    for pattern in total_patterns:
        match = re.search(pattern, ocr_text, re.IGNORECASE)
        if match:
            data['total'] = float(match.group(1))
            break
    
    # Extract date
    date_pattern = r'(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})'
    date_match = re.search(date_pattern, ocr_text)
    if date_match:
        data['date'] = parse_date(date_match.group(1))
    
    # Extract merchant (usually first line)
    lines = ocr_text.split('\n')
    data['merchant'] = lines[0].strip() if lines else None
    
    return data
```

### Category Detection Algorithm

```python
# Simple Keyword-Based Categorization
CATEGORY_KEYWORDS = {
    'Food & Dining': ['restaurant', 'cafe', 'starbucks', 'mcdonald', 'pizza', 'grocery', 'supermarket'],
    'Transportation': ['uber', 'lyft', 'gas', 'fuel', 'parking', 'metro', 'taxi'],
    'Shopping': ['amazon', 'walmart', 'target', 'mall', 'store'],
    'Utilities': ['electric', 'water', 'internet', 'phone', 'bill'],
    'Entertainment': ['cinema', 'theater', 'movie', 'netflix', 'spotify', 'game'],
    'Healthcare': ['pharmacy', 'hospital', 'doctor', 'medical', 'clinic', 'cvs', 'walgreens']
}

def detect_category(merchant_name):
    merchant_lower = merchant_name.lower()
    
    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            if keyword in merchant_lower:
                return {
                    'category': category,
                    'confidence': 0.9,
                    'method': 'keyword_match'
                }
    
    # Fallback: check historical data
    historical_category = lookup_merchant_history(merchant_name)
    if historical_category:
        return {
            'category': historical_category,
            'confidence': 0.7,
            'method': 'historical'
        }
    
    return {
        'category': 'Other',
        'confidence': 0.3,
        'method': 'default'
    }

# ML-Based Category Detection (Advanced)
def train_category_classifier(training_data):
    # Features: merchant name, amount, time of day, day of week
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.ensemble import RandomForestClassifier
    
    vectorizer = TfidfVectorizer(max_features=100)
    X_text = vectorizer.fit_transform(training_data['merchant_names'])
    
    # Combine with numerical features
    X_numerical = training_data[['amount', 'hour', 'day_of_week']].values
    X = np.hstack([X_text.toarray(), X_numerical])
    y = training_data['category']
    
    classifier = RandomForestClassifier(n_estimators=100)
    classifier.fit(X, y)
    
    return classifier, vectorizer
```

### Performance Optimization
- Compress receipt images (JPEG with 70-80% quality)
- Use image thumbnails for list views
- Lazy load receipt images
- Cache OCR results to avoid re-processing
- Index database columns for searches
- Paginate expense lists
- Use connection pooling for database
- Implement request debouncing for search

### Security Considerations
- Encrypt receipt images before cloud upload
- Never store credit card numbers from OCR
- Implement rate limiting on OCR API calls
- Validate file uploads (size, type)
- Use secure HTTPS connections
- Hash passwords with bcrypt
- Sanitize OCR text before storage
- Implement proper CORS policies
- Use environment variables for API keys

### Camera & Image Handling Tips
- Request camera permissions appropriately
- Provide good lighting guidance in UI
- Show grid overlay for alignment
- Allow flash toggle
- Implement auto-focus
- Preview image before accepting
- Provide retake option
- Show OCR processing indicator
- Compress images before upload (max 2MB)

### Debugging Tips
- Log all OCR API requests and responses
- Save problematic receipt images for testing
- Test with variety of receipt types (thermal, printed, handwritten)
- Monitor OCR API costs
- Track OCR accuracy metrics
- Use mock OCR responses during development
- Test offline mode thoroughly
- Validate date parsing edge cases

---

## Additional Resources

### OCR Services & Documentation
- [Google Cloud Vision API](https://cloud.google.com/vision/docs/ocr)
- [AWS Textract](https://aws.amazon.com/textract/)
- [Azure Computer Vision](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/)
- [ML Kit Text Recognition](https://developers.google.com/ml-kit/vision/text-recognition)
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
- [Taggun Receipt OCR API](https://www.taggun.io/)
- [Veryfi OCR API](https://www.veryfi.com/)

### Camera Integration
- [Flutter Camera Plugin](https://pub.dev/packages/camera)
- [React Native Camera](https://github.com/react-native-camera/react-native-camera)
- [Image Picker Plugin](https://pub.dev/packages/image_picker)
- [Image Cropper](https://pub.dev/packages/image_cropper)

### Image Processing Libraries
- **OpenCV**: Advanced image processing
- **Pillow (Python)**: Image manipulation
- **Sharp (Node.js)**: High-performance image processing
- **Cloudinary**: Cloud-based image processing

### Machine Learning Resources
- [Scikit-learn Documentation](https://scikit-learn.org/)
- [TensorFlow Lite](https://www.tensorflow.org/lite)
- [Text Classification Tutorial](https://www.tensorflow.org/tutorials/keras/text_classification)
- [CoreML (iOS)](https://developer.apple.com/documentation/coreml)

### Design Inspiration
- [Expensify](https://www.expensify.com/) - Industry leader
- [Receipt Bank](https://www.receipt-bank.com/)
- [Zoho Expense](https://www.zoho.com/expense/)
- [Splitwise](https://www.splitwise.com/) - Expense splitting
- [Money Lover](https://moneylover.me/)

### Chart & Visualization Libraries
- **fl_chart (Flutter)**: Beautiful charts
- **syncfusion_flutter_charts**: Professional charts
- **react-native-chart-kit**: React Native charts
- **Victory Native**: Data visualization
- **Chart.js**: Web-based charts

### Backend & Cloud Services
- [Firebase](https://firebase.google.com/) - BaaS solution
- [Supabase](https://supabase.com/) - Open-source Firebase alternative
- [AWS Amplify](https://aws.amazon.com/amplify/) - Full-stack platform
- [Cloudinary](https://cloudinary.com/) - Image hosting

### Example Projects
- [Flutter Expense Tracker](https://github.com/topics/expense-tracker-flutter)
- [React Native Receipt Scanner](https://github.com/topics/receipt-scanner)
- [Open Source Expense Apps](https://github.com/topics/expense-manager)

### Tutorials
- [Building OCR App with Flutter](https://medium.com/flutter-community)
- [Receipt OCR with Google Vision](https://cloud.google.com/vision/docs/ocr)
- [Image Processing for OCR](https://nanonets.com/blog/ocr-with-tesseract/)

---

## Evaluation Criteria

Your project will be evaluated based on:

1. **Functionality (35%)**
   - Core expense tracking features
   - Receipt scanning and OCR accuracy
   - Cloud sync reliability
   - Search and filter capabilities

2. **OCR & Image Processing (25%)**
   - OCR accuracy and reliability
   - Image quality handling
   - Receipt parsing logic
   - Error recovery mechanisms

3. **AI/ML Integration (15%)**
   - Category auto-detection accuracy
   - Learning from user corrections
   - Intelligent suggestions
   - *(Bonus feature, but high value)*

4. **User Experience (15%)**
   - Camera interface intuitiveness
   - Expense entry speed
   - Visual design quality
   - Analytics clarity

5. **Code Quality & Testing (10%)**
   - Clean architecture
   - Error handling
   - Test coverage
   - Code documentation

**Bonus Points:**
- Advanced ML category detection (+10%)
- Multi-currency with real-time exchange rates (+5%)
- Receipt splitting for shared expenses (+5%)
- Banking API integration (+10%)

---

## Support & Questions

If you have questions about this project:
1. Test multiple OCR services to find the best fit for your use case
2. Start with Google Vision API (generous free tier)
3. Focus on image preprocessing for better OCR results
4. Review existing receipt scanning apps for UX patterns
5. Post in the project discussion forum
6. Contact the project mentor for ML implementation guidance

**Good luck building your Expense Tracker with Receipt Scanner!** 💰📸
