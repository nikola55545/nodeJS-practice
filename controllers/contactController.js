const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
});

//@desc get one contact
//@route GET /api/contacts
//@access public

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    else {
        res.status(200).json(contact);
    }
});

//@desc create contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
        res.status(400);
        throw new Error('Please provide first and last name');
    }

    const contact = await Contact.create({name, email, phone});
    res.status(201).json(contact);
});

//@desc update contact
//@route PUT /api/contacts
//@access public

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    else {
        contact.name = req.body.name || contact.name;
        contact.email = req.body.email || contact.email;
        contact.phone = req.body.phone || contact.phone;
        const updatedContact = await contact.save();
        res.status(200).json(updatedContact);
    }
});

//@desc delete contact
//@route GET /api/contacts
//@access public

const deleteContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    else {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Contact removed' });
    }
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContacts
};