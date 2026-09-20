//Who booked what when for how much all data will be store here
//Which property?
//Which user
//price
//dates
//guests
//paid

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    property:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Booking must belong to property"]
    },

    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Booking must belong to user"]
    },

    price:{
      type: Number,
      required: [true, "Booking must have price"]
    },

    createdAt:{
      type: Date,
      default: Date.now()
    },

    paid:{
      type: Boolean,
      default: true
    },

    fromDate:{
      type: Date
    },

    guests:{
      type: Number
    },

    numberOfNights:{
      type: Number
    }

  },
  {timestamps: true}
  
);

bookingSchema.pre(/^find/, function(){
  this.populate("user");
    
    this.populate({
    path: "property",    
    select: " maximumGuests images propertyName address"
  });
  
});

const Booking = mongoose.model("Booking", bookingSchema);
export {Booking};