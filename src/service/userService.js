import { rooms } from '../data/rooms.js'
import { booking } from '../data/booking.js'

const GettingRooms = (req, res) => {
    try {
        res.status(200).send({
            message: "Rooms Data Fetch Successfully",
            data: rooms
            
        })
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}


const CreatingRooms = (req, res) => {
    try {
        const { name, Seats, amenities, pricePerHour } = req.body;
        const newRoom = {
            id: (rooms.length + 1).toString(),
            name,
            Seats,
            amenities,
            pricePerHour,
            bookings: []
        };
        rooms.push(newRoom);
        res.status(201).json({ message: "Room created successfully", data: newRoom });

    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }

};
const CreateBooking = (req, res) => {
    try {
        const { CustomerName, RoomId, date, startTime, endTime } = req.body;
        const room = rooms.find(r => r.id == RoomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        const bookings = {
            id: (booking.length + 1).toString(),
            CustomerName,
            RoomId,
            date,
            startTime,
            endTime,
            status: 'Booked'
        };
        room.booking.push(bookings);
        booking.push(bookings);
        res.status(201).json({ message: "Room booked successfully", data: bookings });
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }

};
const ListRoomWithBooking = (req, res) => {
    try {
        const roomList = rooms.map(room => {
            const roomBookings = booking.filter(bookings => bookings.RoomId === room.id);
            
            return {
                roomName: room.name,
                bookedStatus: roomBookings.length > 0 ? 'Booked' : 'Available',
                bookings: roomBookings.map(booking => ({
                    customerName: booking.CustomerName,
                    date: booking.Date,
                    startTime: booking.StartTime,
                    endTime: booking.EndTime
                }))
            };
        });

        res.status(200).json({
            message: "Room booking data fetched successfully",
            data: roomList
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
};

const ListCustomerWithBooking = (req, res) => {
    try {
        const customerBookings = booking.map(b => ({
            CustomerName: b.CustomerName,
            RoomName: rooms.find(r => r.id === b.RoomId).name,
            Date: b.Date,
            StartTime: b.StartTime,
            EndTime: b.EndTime
        }));

        res.status(200).send({
            message: "Customer bookings fetched successfully",
            data: customerBookings
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
};

const TotalCustomerWithBookings = (req, res) => {
    try {
        const { id } = req.params;

        // Filter bookings for the specified customer
        const customerBookings = booking.filter(bookings => bookings.id === Number(id));

        if (customerBookings.length === 0) {
            return res.status(404).send({
                message: "No bookings found for the given customer",
            });
        }

        // Count the number of times the customer has booked each room
        const roomBookingCounts = {};
        customerBookings.forEach(booking => {
            if (!roomBookingCounts[booking.RoomId]) {
                roomBookingCounts[booking.RoomId] = 0;
            }
            roomBookingCounts[booking.RoomId]++;
        });

        // Map bookings to include required details and booking count
        const bookingDetails = customerBookings.map(booking => ({
            bookingCount: roomBookingCounts[booking.RoomId],
            customerName: booking.CustomerName,
            roomName: rooms.find(room => room.id === booking.RoomId).name,
            date: booking.Date,
            startTime: booking.StartTime,
            endTime: booking.EndTime,
            bookingId: booking.id,
            bookingDate: booking.bookingDate || "N/A",
            bookingStatus: booking.status
            
        }));

        res.status(200).json({
            message: "Customer bookings fetched successfully",
            data: bookingDetails
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
    
};



export default {
    GettingRooms,
    CreatingRooms,
    CreateBooking,
    ListRoomWithBooking,
    ListCustomerWithBooking,
    TotalCustomerWithBookings
    
}
