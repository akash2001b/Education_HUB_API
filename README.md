
# Education_HUB API



## Indices

* [Authentication](#authentication)

  * [Forgot Password](#1-forgot-password)
  * [Get logged in User via token](#2-get-logged-in-user-via-token)
  * [Login User](#3-login-user)
  * [Logout User](#4-logout-user)
  * [Register User](#5-register-user)
  * [Reset Password](#6-reset-password)
  * [Update Password](#7-update-password)
  * [Update user details](#8-update-user-details)

* [Bootcamps](#bootcamps)

  * [get bootcamps by distance](#1-get-bootcamps-by-distance)
  * [upload photor](#2-upload-photor)
  * [{{URL}}/api/v1/bootcamps](#3-{{url}}apiv1bootcamps)
  * [{{URL}}/api/v1/bootcamps](#4-{{url}}apiv1bootcamps)
  * [{{URL}}/api/v1/bootcamps/1](#5-{{url}}apiv1bootcamps1)
  * [{{URL}}/api/v1/bootcamps/1](#6-{{url}}apiv1bootcamps1)
  * [{{URL}}/api/v1/bootcamps/1](#7-{{url}}apiv1bootcamps1)

* [Reviews](#reviews)

  * [Add review for a bootcamp](#1-add-review-for-a-bootcamp)
  * [Delete review](#2-delete-review)
  * [GEt all reviews from database](#3-get-all-reviews-from-database)
  * [Get reviews for bootcamp](#4-get-reviews-for-bootcamp)
  * [Get single review from database](#5-get-single-review-from-database)
  * [update review](#6-update-review)

* [Users](#users)

  * [Delete user](#1-delete-user)
  * [Get all users(admin)](#2-get-all-users(admin))
  * [Get signle users(admin)](#3-get-signle-users(admin))
  * [create user](#4-create-user)
  * [update user](#5-update-user)

* [courses](#courses)

  * [Create bootcamp course](#1-create-bootcamp-course)
  * [delete course](#2-delete-course)
  * [get all courses](#3-get-all-courses)
  * [get courses for bootcamp](#4-get-courses-for-bootcamp)
  * [get signle course](#5-get-signle-course)
  * [update course](#6-update-course)


--------


## Authentication



### 1. Forgot Password



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/forgotpassword
```



***Body:***

```js        
{
    "email":"john@gmail.com"
}
```



### 2. Get logged in User via token



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/auth/me
```



### 3. Login User



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/login
```



***Body:***

```js        
{
    "email": "admin@gmail.com",
    "password": "123456"
}
```



### 4. Logout User


clear token cookie


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/auth/logout
```



***Body:***

```js        
{
    "email": "admin@gmail.com",
    "password": "123456"
}
```



### 5. Register User


add user to databse with encrypted password



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/register
```



***Body:***

```js        
{
    "name": "akash",
    "email": "akash@gmail.com",
    "role": "user", 
    "password": "123456"
}
```



### 6. Reset Password


reset password using token


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/resetpassword/6f44a75eac913370e3c59a87c1cf236146e46602
```



***Body:***

```js        
{
    "password":"1234567"
}
```



### 7. Update Password


update logged in users password . send in the body currentPassword and newPassword


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth//updatepassword
```



***Body:***

```js        
{
    "currentPassword":"1234567",
    "newPassword":"123456"
}
```



### 8. Update user details


update user name and email


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatedetails
```



***Body:***

```js        
{
    "email":"john@gmail.com",
    "name":"John Doe"
}
```



## Bootcamps
bootcamps crud functionality



### 1. get bootcamps by distance


get bootcamps by distance


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/radius/02118/30
```



### 2. upload photor


route to upload a bootcamp photo


***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: {{URL}}/api/v1/bootcamps/60b34966fdff3a27fa61fffc/photo
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| file |  |  |



### 3. {{URL}}/api/v1/bootcamps


add new bootcamp to databse
.must be authenticated



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjJhYjllOWMxOTYzMzJkM2NhNjc3NCIsImlhdCI6MTYyMjM2MjMzMCwiZXhwIjoxNjI0OTU0MzMwfQ.gYkXAXbiblZCzhI21exxb-_hV8ez_Gdhbf-lneE4L30 |  |



***Body:***

```js        
{
    "name": "test bootcamp...............",
    "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
    "website": "https://devworks.com",
    "phone": "(111) 111-1111",
    "email": "enroll@devworks.com",
    "address": "sector 1 saltlake Kolkata , west bengal,india 700064 ",
    "careers": [
        "Web Development",
        "UI/UX", 
        "Business"
    ],
    "housing": true,
    "jobAssistance": true,
    "jobGuarantee": false,
    "acceptGi": true
}
```



### 4. {{URL}}/api/v1/bootcamps


fetch all bootcamps from database. Incluedes pagination, filtering ect



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps
```



### 5. {{URL}}/api/v1/bootcamps/1


get a single bootcamp by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/5d713a66ec8f2b88b8f830b8
```



### 6. {{URL}}/api/v1/bootcamps/1


update bootcamp.update single bootcamp in databse



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/bootcamps/60b4bf436c036b17bd7914c8
```



***Body:***

```js        
{
    "housing":false
}
```



### 7. {{URL}}/api/v1/bootcamps/1


delete bootcamp from databse



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/bootcamps/60b349884da78b285152991e
```



## Reviews
Manage course reviews



### 1. Add review for a bootcamp


Insert review for a specific bootcamp


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/reviews
```



***Body:***

```js        
{
    "title": "Learned a ton!",
    "text": "testing bootcamp",
    "rating": "8"
}
```



### 2. Delete review


Delete review from database


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/reviews/60b65b0d54e468269176a76b
```



***Body:***

```js        
{
    "title": "have fun"
}
```



### 3. GEt all reviews from database


get all reviews from database and popluate with bootcamp name and description


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/reviews
```



### 4. Get reviews for bootcamp


fetch the reviews for a specific bootcamp


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/reviews
```



### 5. Get single review from database


fetch a review by id from database and populate bootcamp name and description


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/reviews/5d7a514b5d2c12c7449be026
```



### 6. update review


update review in database


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/reviews/60b65b0d54e468269176a76b
```



***Body:***

```js        
{
    "title": "have fun"
}
```



## Users



### 1. Delete user


Delete user from database( admin)


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/users/60b622408625562920df5f78
```



***Body:***

```js        
{
    "name": "akash.........",
    "password": "123456",
    "email": "akash@gmail.com"
}
```



### 2. Get all users(admin)



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users
```



### 3. Get signle users(admin)


get single user by id(admin)


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users/5c8a1d5b0190b214360dc040
```



### 4. create user


create user (admin)


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users
```



***Body:***

```js        
{
    "name": "akash roy",
    "password": "123456",
    "email": "akash@gmail.com"
}
```



### 5. update user


update user in database (admin)


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/users/60b622408625562920df5f78
```



***Body:***

```js        
{
    "name": "akash.........",
    "password": "123456",
    "email": "akash@gmail.com"
}
```



## courses



### 1. Create bootcamp course


create a course for a particular bootcamp


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/courses
```



***Body:***

```js        
{
    "title": "some course.....",
    "description": "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
    "weeks": 8,
    "tuition": 10000,
    "minimumSkill": "beginner",
    "scholarhipsAvailable": true
}
```



### 2. delete course


remvoe course from database


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/courses/60b4ced0da3a3e26d5f9c332
```



***Body:***

```js        
{
    "tuition": 6900,
    "minimumSkill": "advanced"
}
```



### 3. get all courses


get all courses



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/courses
```



### 4. get courses for bootcamp


get specific course fora bootcamp



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses
```



### 5. get signle course


get single course by id



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/courses/5d725a4a7b292f5f8ceff789
```



### 6. update course


update a course


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/courses/60b4ced0da3a3e26d5f9c332
```



***Body:***

```js        
{
    "tuition": 6900,
    "minimumSkill": "advanced"
}
```


