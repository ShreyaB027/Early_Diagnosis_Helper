# DiabeteDetect API Documentation

## Overview

DiabeteDetect provides a REST API for diabetes risk prediction using machine learning analysis of patient health metrics.

## Base URL

```
http://localhost:8080/api
```

## Endpoints

### 1. Predict Diabetes Risk

**Endpoint:** `POST /api/predict`

**Description:** Submits patient health data and receives diabetes risk prediction.

**Request Body:**

```json
{
  "age": 45,
  "bmi": 28.5,
  "glucose": 145,
  "bloodPressure": 135,
  "insulin": 220,
  "pregnancies": 2
}
```

**Parameters:**

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| age | number | 0-150 | Patient age in years |
| bmi | number | 0-100 | Body Mass Index (kg/m²) |
| glucose | number | 0-500 | Blood glucose level (mg/dL) |
| bloodPressure | number | 0-250 | Systolic blood pressure (mmHg) |
| insulin | number | 0-1000 | Serum insulin level (mIU/L) |
| pregnancies | number | 0-20 | Number of pregnancies |

**Response (Success - 200):**

```json
{
  "success": true,
  "prediction": "Diabetic",
  "probability": 0.75,
  "accuracy": 0.85,
  "patientId": "507f1f77bcf86cd799439011",
  "factors": [
    {
      "name": "Glucose Level",
      "value": 145,
      "impact": "high"
    },
    {
      "name": "BMI",
      "value": 28.5,
      "impact": "medium"
    },
    {
      "name": "Blood Pressure (Systolic)",
      "value": 135,
      "impact": "medium"
    },
    {
      "name": "Insulin Level",
      "value": 220,
      "impact": "high"
    },
    {
      "name": "Age",
      "value": 45,
      "impact": "medium"
    },
    {
      "name": "Pregnancies",
      "value": 2,
      "impact": "low"
    }
  ]
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "error": "Invalid input data",
  "prediction": "Not Diabetic",
  "probability": 0,
  "accuracy": 0,
  "factors": []
}
```

### 2. Get Patient History

**Endpoint:** `GET /api/history`

**Description:** Retrieves the last 50 patient assessments from the database.

**Response (Success - 200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "age": 45,
      "bmi": 28.5,
      "glucose": 145,
      "bloodPressure": 135,
      "insulin": 220,
      "pregnancies": 2,
      "prediction": "Diabetic",
      "probability": 0.75,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1
}
```

**Response (Error):**

```json
{
  "success": false,
  "error": "Database not available",
  "data": [],
  "total": 0
}
```

## Risk Scoring Methodology

The model calculates diabetes risk based on clinical guidelines:

### Glucose Level
- `> 200 mg/dL`: Critical (likely diabetic range)
- `> 126 mg/dL`: High (fasting glucose above normal)
- `> 100 mg/dL`: Elevated (impaired fasting glucose)
- `≤ 100 mg/dL`: Normal

### BMI (Body Mass Index)
- `> 30`: Obese (high risk)
- `25-30`: Overweight (moderate risk)
- `< 25`: Normal (low risk)

### Blood Pressure (Systolic)
- `> 140 mmHg`: Stage 2 Hypertension (high risk)
- `130-140 mmHg`: Stage 1 Hypertension (moderate risk)
- `< 130 mmHg`: Normal (low risk)

### Insulin Resistance
- `> 400 mIU/L`: Very high (severe insulin resistance)
- `200-400 mIU/L`: High (insulin resistance)
- `100-200 mIU/L`: Elevated (possible resistance)
- `< 100 mIU/L`: Normal

### Age
- `> 60 years`: Increased risk
- `45-60 years`: Moderate risk
- `< 45 years`: Lower risk

### Pregnancy History
- `> 5 pregnancies`: Increased gestational diabetes risk
- `1-5 pregnancies`: Moderate history
- `0 pregnancies`: No history

## Impact Levels

Each factor is scored with an impact level:

- **High Impact**: Strong indicator of diabetes risk
- **Medium Impact**: Moderate contributor to risk
- **Low Impact**: Minimal effect on risk score

## Data Persistence

- **With MongoDB**: Patient assessments are automatically saved to MongoDB
- **Without MongoDB**: Assessments are processed but not persisted (development mode)

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK`: Successful prediction
- `400 Bad Request`: Invalid input data
- `500 Internal Server Error`: Server-side error

## Example Usage

### Using cURL

```bash
curl -X POST http://localhost:8080/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 45,
    "bmi": 28.5,
    "glucose": 145,
    "bloodPressure": 135,
    "insulin": 220,
    "pregnancies": 2
  }'
```

### Using JavaScript/Fetch

```javascript
const response = await fetch('/api/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    age: 45,
    bmi: 28.5,
    glucose: 145,
    bloodPressure: 135,
    insulin: 220,
    pregnancies: 2
  })
});

const result = await response.json();
console.log(result);
```

## Authentication

Currently, the API does not require authentication. For production deployment, consider implementing:

- API Key authentication
- JWT Bearer tokens
- OAuth2 integration

## Rate Limiting

No rate limiting is currently implemented. For production, consider adding rate limiting to prevent abuse.

## CORS

The API enables CORS for all origins. For production, configure CORS to only allow trusted domains.

## Notes

- All predictions are for research and clinical decision support only
- Predictions should not replace professional medical diagnosis
- Always consult with qualified healthcare professionals for clinical decisions
- Patient data privacy and HIPAA compliance are important considerations for production deployment
