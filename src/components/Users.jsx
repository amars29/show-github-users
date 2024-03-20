/*  A default screen which fetches Users from the Github API and displays them in a list. For each user you should show their avatar, username. 
Each item in the list should link to the User Details page detailed below.*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Box,
} from "@mui/material";

const Users = () => {
  //   const classes = useStyles();
  const [users, setUsers] = useState([]);

  const [since, setSince] = useState(0);
  //   const [perPage, setPerPage] = useState(10);
  const perPage = 10;
  const [error, setError] = useState(false);

  // const githubToken = process.env.GITHUB_ACCESS_TOKEN;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users?since=${since}&per_page=${perPage}`
          //   ,{
          //     headers: {
          //       Authorization: `Bearer ${githubToken}`,
          //     },
          //   }
        );
        if (!response.ok) {
          console.log("Failed to fetch the users");
        } else {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(true);
      }
    };

    fetchUsers();
  }, [since, perPage]);

  const nextPage = () => {
    setSince(users[users.length - 1].id);
  };

  const prevPage = () => {
    if (since > 0) {
      setSince(Math.max(0, since - perPage * 2));
    }
  };

  return (
    <Box
      sx={{
        padding: 2.5,
      }}
    >
      <h1>Github Users</h1>
      {users.length === 0 && !error ? (
        <p>Loading...</p>
      ) : (
        <div>
          {error ? (
            <div>Error occured in fetching the users</div>
          ) : (
            <>
              <List
                sx={{
                  gap: 2,
                }}
              >
                {users.map((user) => (
                  <ListItem
                    key={user.id}
                    component={Link}
                    to={`/user/${user.login}`}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                      "&:focus": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                      gap: 2,
                      cursor: "pointer",
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      borderBottomStyle: "solid",
                    }}
                  >
                    <Avatar alt={user.login} src={user.avatar_url} />
                    <ListItemText primary={user.login} color="red" />
                  </ListItem>
                ))}
              </List>
              <Button onClick={prevPage} disabled={since === 0}>
                Previous Page
              </Button>
              <Button onClick={nextPage}>Next Page</Button>
            </>
          )}
        </div>
      )}
    </Box>
  );
};

export default Users;
