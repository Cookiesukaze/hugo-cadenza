---
title: "API Reference"
date: 2023-02-15
tags: ["api", "reference", "development"]
featured: true
---

# API Reference

## Introduction

This document provides a comprehensive reference for our REST API.

## Authentication

All API requests require authentication using an API key. Include your API key in the header of each request:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Users

#### Get User

```
GET /api/v1/users/{user_id}
```

Returns information about a specific user.

**Parameters:**

- `user_id` (required): The ID of the user to retrieve

**Response:**

```json
{
  "id": "123456",
  "username": "johndoe",
  "email": "john@example.com",
  "created_at": "2023-01-15T12:00:00Z"
}
```

#### Create User

```
POST /api/v1/users
```

Creates a new user.

**Request Body:**

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "id": "789012",
  "username": "newuser",
  "email": "newuser@example.com",
  "created_at": "2023-02-15T14:30:00Z"
}
```

### Projects

#### List Projects

```
GET /api/v1/projects
```

Returns a list of projects for the authenticated user.

**Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 20)

**Response:**

```json
{
  "total": 42,
  "page": 1,
  "limit": 20,
  "data": [
    {
      "id": "project-123",
      "name": "My Project",
      "description": "Project description",
      "created_at": "2023-01-10T09:00:00Z"
    },
    // More projects...
  ]
}
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request.

Common error codes:

- `400 Bad Request`: The request was malformed
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: The authenticated user doesn't have permission
- `404 Not Found`: The requested resource doesn't exist
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Something went wrong on the server

Error responses include a JSON body with more details:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": "The 'username' field is required"
  }
}
```

## Rate Limiting

API requests are limited to 100 requests per minute per API key. If you exceed this limit, you'll receive a `429 Too Many Requests` response.

The response headers include information about your rate limit status:

- `X-RateLimit-Limit`: The maximum number of requests allowed per minute
- `X-RateLimit-Remaining`: The number of requests remaining in the current window
- `X-RateLimit-Reset`: The time at which the current rate limit window resets, in UTC epoch seconds
