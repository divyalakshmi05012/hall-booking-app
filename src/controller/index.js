import express from 'express'
import userController from './userController.js'

const controller=express.Router()

controller.use('/api',userController)

export default controller