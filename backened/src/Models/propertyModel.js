import slugify from 'slugify';
import mongoose from 'mongoose';

// Create a schema for the property model
const propertySchema = new mongoose.Schema({
  propertyName:{
    type: String,
    required: [true, "Please enter property name"],
  },
  description:{
    type: String,
    required: [true, "Please add information about your property"]
  },
  extraInfo: {
    type: String,
    default:"checkin on time. good services available"
  },
  propertyType:{
    type: String,
    enum:["House", "Flat", "Guest House", "Hotel"],
    default: "House"
  },
  roomType:{
    type: String,
    enum:["Anytype", "Room", "Entire Home"],
    default: "Anytype"
  },
  maximumGuests:{
    type: Number,
    required: [true, "Please enter maximum guests that can occupy"],
  },
  amenities:[
    {
      name:{
        type: String,
        required: true,
        enum:[
          "Wifi",
          "Kitchen",
          "AC",
          "Washing Machine",
          "TV",
          "Pool",
          "Free Parking"
          
        ]
    },
    icon:{
      type: String,
      required: true,
    }
  }
  ],
  images:{
    type:[
      {
        public_id:{
          type: String,
        },
        url:{
          type: String,
          required: true
        }
      }
    ],
    validate:{
      validator: function(arr){
        return arr.length >= 6;
    },
    message: "The image must contain atleast 6 images"
  }
},
price:{
  type: Number,
  required: [true, "Please enter price per night"],
  default: 500
},
address:{
  area:String,
  city:String,
  state:String,
  pincode:Number
},
//
currentBookings:[
  {
    bookingId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
    },
    fromDate:{
      type: Date
    },
    toDate:{
      type: Date
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }


],

userId:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},
slug: String,
checkInTime:{type: String, default: "11:00 PM"},
checkOutTime:{type: String, default: "13:00 PM"},
    
})

//To make the property name into the url friendly
propertySchema.pre("save", function(){
  this.slug = slugify(this.propertyName, {lower:true});
  
})

//To remove all spaces from the address fields
propertySchema.pre("save", function(){
  this.address.city = this.address.city.toLowerCase().replaceAll(" ", "");
  
})

//const Property = mongoose.model("Property", propertySchema);
const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);

export {Property};