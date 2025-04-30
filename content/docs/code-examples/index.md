---
title: "代码示例"
date: 2023-03-15
tags: ["code", "examples", "programming"]
featured: true
---

# 代码示例

这个页面展示了不同编程语言的代码示例，用于测试代码块的样式。

## HTML 示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Example</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>About Us</h2>
            <p>This is a paragraph about our company.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2023 My Company</p>
    </footer>
</body>
</html>
```

## CSS 示例

```css
/* Basic reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

header {
    background-color: #35424a;
    color: white;
    padding: 20px;
    border-bottom: 3px solid #e8491d;
}

nav ul {
    display: flex;
    list-style: none;
}

nav ul li {
    margin-right: 20px;
}

nav a {
    color: white;
    text-decoration: none;
}

main {
    padding: 30px;
    max-width: 1200px;
    margin: 0 auto;
}

section {
    margin-bottom: 30px;
}

h1, h2 {
    margin-bottom: 15px;
}

footer {
    background-color: #35424a;
    color: white;
    text-align: center;
    padding: 20px;
    margin-top: 40px;
}
```

## JavaScript 示例

```javascript
// Example of a class in JavaScript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
    
    static compareAges(person1, person2) {
        if (person1.age > person2.age) {
            return `${person1.name} is older than ${person2.name}`;
        } else if (person1.age < person2.age) {
            return `${person1.name} is younger than ${person2.name}`;
        } else {
            return `${person1.name} and ${person2.name} are the same age`;
        }
    }
}

// Creating instances
const john = new Person('John', 30);
const jane = new Person('Jane', 25);

// Using methods
john.greet(); // Output: Hello, my name is John and I am 30 years old.
jane.greet(); // Output: Hello, my name is Jane and I am 25 years old.

// Using static method
console.log(Person.compareAges(john, jane)); // Output: John is older than Jane

// Example of async/await
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

// Using the async function
fetchUserData(123)
    .then(user => {
        if (user) {
            console.log('User data:', user);
        } else {
            console.log('Failed to fetch user data');
        }
    });
```

## Python 示例

```python
# Example of a class in Python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old.")
    
    @staticmethod
    def compare_ages(person1, person2):
        if person1.age > person2.age:
            return f"{person1.name} is older than {person2.name}"
        elif person1.age < person2.age:
            return f"{person1.name} is younger than {person2.name}"
        else:
            return f"{person1.name} and {person2.name} are the same age"

# Creating instances
john = Person("John", 30)
jane = Person("Jane", 25)

# Using methods
john.greet()  # Output: Hello, my name is John and I am 30 years old.
jane.greet()  # Output: Hello, my name is Jane and I am 25 years old.

# Using static method
print(Person.compare_ages(john, jane))  # Output: John is older than Jane

# Example of async function in Python (using asyncio)
import asyncio
import aiohttp

async def fetch_user_data(user_id):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(f"https://api.example.com/users/{user_id}") as response:
                if response.status != 200:
                    raise Exception(f"HTTP error! Status: {response.status}")
                
                data = await response.json()
                return data
    except Exception as e:
        print(f"Error fetching user data: {e}")
        return None

# Using the async function
async def main():
    user = await fetch_user_data(123)
    if user:
        print("User data:", user)
    else:
        print("Failed to fetch user data")

# Run the async function
if __name__ == "__main__":
    asyncio.run(main())
```

## Go 示例

```go
package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "strconv"
)

// Person struct
type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

// Greet method for Person
func (p *Person) Greet() {
    fmt.Printf("Hello, my name is %s and I am %d years old.\n", p.Name, p.Age)
}

// CompareAges static function
func CompareAges(person1, person2 *Person) string {
    if person1.Age > person2.Age {
        return fmt.Sprintf("%s is older than %s", person1.Name, person2.Name)
    } else if person1.Age < person2.Age {
        return fmt.Sprintf("%s is younger than %s", person1.Name, person2.Name)
    } else {
        return fmt.Sprintf("%s and %s are the same age", person1.Name, person2.Name)
    }
}

// FetchUserData function
func FetchUserData(userID int) (*Person, error) {
    url := fmt.Sprintf("https://api.example.com/users/%d", userID)
    
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("HTTP error! Status: %d", resp.StatusCode)
    }
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }
    
    var person Person
    err = json.Unmarshal(body, &person)
    if err != nil {
        return nil, err
    }
    
    return &person, nil
}

func main() {
    // Creating instances
    john := &Person{Name: "John", Age: 30}
    jane := &Person{Name: "Jane", Age: 25}
    
    // Using methods
    john.Greet() // Output: Hello, my name is John and I am 30 years old.
    jane.Greet() // Output: Hello, my name is Jane and I am 25 years old.
    
    // Using static function
    fmt.Println(CompareAges(john, jane)) // Output: John is older than Jane
    
    // Using FetchUserData
    userID := 123
    user, err := FetchUserData(userID)
    if err != nil {
        fmt.Printf("Error fetching user data: %v\n", err)
    } else {
        fmt.Printf("User data: %+v\n", user)
    }
}
```

## SQL 示例

```sql
-- Create a users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some users
INSERT INTO users (name, email, age) VALUES
    ('John Doe', 'john@example.com', 30),
    ('Jane Smith', 'jane@example.com', 25),
    ('Bob Johnson', 'bob@example.com', 35);

-- Select all users
SELECT * FROM users;

-- Select users with age greater than 30
SELECT name, email, age 
FROM users 
WHERE age > 30;

-- Update a user's email
UPDATE users 
SET email = 'john.doe@example.com' 
WHERE id = 1;

-- Join users with their orders
SELECT u.name, o.order_id, o.total_amount
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.order_date > '2023-01-01'
ORDER BY o.order_date DESC;

-- Create a view for active users
CREATE VIEW active_users AS
SELECT id, name, email
FROM users
WHERE last_login_date > CURRENT_DATE - INTERVAL '30 days';

-- Create a stored procedure
CREATE PROCEDURE update_user_age(user_id INT, new_age INT)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE users SET age = new_age WHERE id = user_id;
    COMMIT;
END;
$$;

-- Call the stored procedure
CALL update_user_age(1, 31);
```

## JSON 示例

```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001"
      },
      "phoneNumbers": [
        {
          "type": "home",
          "number": "212-555-1234"
        },
        {
          "type": "work",
          "number": "646-555-5678"
        }
      ],
      "isActive": true,
      "roles": ["user", "admin"]
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "age": 25,
      "address": {
        "street": "456 Park Ave",
        "city": "Boston",
        "state": "MA",
        "zipCode": "02101"
      },
      "phoneNumbers": [
        {
          "type": "mobile",
          "number": "617-555-9876"
        }
      ],
      "isActive": true,
      "roles": ["user"]
    }
  ],
  "metadata": {
    "totalCount": 2,
    "lastUpdated": "2023-03-15T12:00:00Z",
    "version": "1.0.0"
  },
  "settings": {
    "theme": "dark",
    "notifications": {
      "email": true,
      "push": false
    },
    "language": "en-US"
  }
}
```
