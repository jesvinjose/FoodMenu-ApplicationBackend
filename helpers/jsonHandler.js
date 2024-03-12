export const jsonErrorHandler={
    'error0':{
        message:"Internal Server Error",
        status:500
    },
    'error1':{
        message:"Invalid Email",
        status:422
    },
    'error2':{
        message:"Invalid Password",
        status:422
    },
    'error3':{
        message:"Passwords not matching",
        status:422
    },
    "error4":{
        message:"User is not registered"
    },
    "error5":{
        message:"Email already Exists"
    },
    "error6":{
        message:"Inputs Required"
    },
    "error7":{
        message:"Menu Not existing"
    },
    "error8":{
        message:"Choose category from Indian, Chineese, Thai, Arabian or Shakes & IceCreams"
    }
} 

export const jsonSuccessHandler={
    'success1':{
        message:"User Registered Successfully"
    },
    'success2':{
        message:"User Logged In Successfully"
    },
    'success3':{
        message:"User Logged Out Successfully"
    },
    'success4':{
        message:"User Updated Successfully"
    },
    success5:{
        message:"Role Updated Successfully"
    },
    success6:{
        message:"Menu Updated Successfully"
    },
    success7:{
        message:"Menu Created Successfully"
    },
    success8:{
        message:"Menu Listed Successfully"
    }
}