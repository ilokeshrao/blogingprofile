backendprojectsecond/
│
├── blogingprofile/
│   └── backendprojectsecond/
│       ├── controllers/
│       │   ├── regcontroller.js
│       │   └── blogcontroller.js
│       ├── helpers/
│       │   ├── logincheckfunction.js
│       │   └── multer.js
│       ├── modules/
│       │   └── reg.js (Mongoose user model)
│       ├── routes/
│       │   ├── userroutes.js
│       │   └── adminroutes.js
│       ├── views/ (EJS templates)
│       ├── public/ (CSS, JS, image files)
│       └── app.js / server.js




git clone https://github.com/ilokeshrao/blogingprofile.git
cd blogingprofile/backendprojectsecond
npm install
npm start

Blogging Profile ek full-stack web application hai jo users ko apna account banane, login karne, password reset karne, aur apne blogs create karne ki suvidha deta hai. Is project me ek secure authentication system implement kiya gaya hai jisme email verification aur forgot password functionality bhi shamil hai. Users apna profile update kar sakte hain, image upload kar sakte hain, aur apne blogs ko manage kar sakte hain (add, view, delete).

Iske alawa, ek admin panel bhi develop kiya gaya hai jahan admin (admin@gmail.com) login karke sabhi registered users ko dekh sakta hai, unka status activate/suspend kar sakta hai, users ko delete kar sakta hai, aur unki subscription status ko bhi manage kar sakta hai. Pure project me Node.js, Express.js, MongoDB, EJS, aur Multer jaise modern tools ka upyog kiya gaya hai jisse performance aur maintainability dono ensure ki ja sakein.

