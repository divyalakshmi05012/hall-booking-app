Hall Booking App
Overview
The Hall Booking App is a simple web application that allows users to book halls for events. It uses the browser's local storage to save and retrieve booking data.

Features
Book a Hall: Users can book a hall by specifying the date, time, and event details.
View Bookings: Users can view all existing bookings.
Persistent Data: All bookings are saved in the browser's local storage, ensuring data persistence between sessions.
Technologies Used
HTML
CSS
JavaScript (ES6)
Local Storage
Routes:
controller.use('/api',userController)
End Point for :
get('/create') used to getting all rooms details
post('/rooms') used to create room
post('/booking') used to create booking
get('/list-rooms') list all Rooms with booking 
get('/list-customer') list all customer with booking details
userController.get('/customers/:id/bookings') list total number of customer with same booking room
