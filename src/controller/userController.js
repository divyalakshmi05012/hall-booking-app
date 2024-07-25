import express  from "express";
import userService from  '../service/userService.js'


const userController=express.Router()

userController.get('/create',userService.GettingRooms)
userController.post('/rooms',userService.CreatingRooms)
userController.post('/booking',userService.CreateBooking,)
userController.get('/list-rooms',userService.ListRoomWithBooking, )
userController.get('/list-customer',userService.ListCustomerWithBooking)
userController.get('/customers/:id/bookings',userService.TotalCustomerWithBookings )





export default userController