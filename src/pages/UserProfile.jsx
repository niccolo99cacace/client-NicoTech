import React, { useState,useEffect } from "react";
import { Avatar, Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { getUserInformations, logout } from '../api/auth';

const UserProfile = () => {

    const [userInformations, setUserInformations] = useState({ name: "", email: "" });


    useEffect(() => {

        const fetchUserInformations = async () => {
        const res = await getUserInformations();
        setUserInformations({name:res.name, email:res.email })
    }
    
        fetchUserInformations();
      }, []);


      const handleLogout = async () =>  {
        
        await logout();
        
        window.location.replace("/"); }


  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{marginTop:30}}>
        <Avatar style={{ width: 150, height: 150, fontSize: 50, border: "2px solid black",backgroundColor:"green", color:"white" }}>U</Avatar>
        <Typography variant="h6" style={{marginTop:20}}>{userInformations.name}</Typography>
        <Typography variant="h6" style={{marginTop:20}}>{userInformations.email}</Typography>
        <Grid container justifyContent="center" spacing={5} style={{marginTop:30}}>
          <Grid item >
            <Button variant="contained"  style={{ backgroundColor:"#0046be", color:"white"}} >profile management</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" style={{ backgroundColor:"white", color:"#0046be"}} >my purchases</Button>
          </Grid>
        </Grid>
      </Box>
      <Button variant="outlined"  onClick={() => handleLogout()} 
      style={{ backgroundColor:"white", color:"red",marginTop:50}} >Logout</Button>
    </Container>
  );
};

export default UserProfile;