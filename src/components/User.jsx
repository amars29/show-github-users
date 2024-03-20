/* A screen which shows more detailed information for the selected user: avatar, username, first name, second name, location, company etc. 
We can show extended profile information (such as company and social handles), a summary on their followers, following and number of public repositories.*/

import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { UsersIcon } from "./icons";
import BasicDetails from "./BasicDetails";
import Repositories from "./Repositories";

function User(props) {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const fetchUser = async () => {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${userId}`, {
          headers: {
            Authorization:
              "Bearer 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",
          },
        });
        if (!response.ok) {
          console.log(`Failed to fetch the user ${userId}`);
        } else {
          const data = await response.json();
          console.log(data);
          setUser(data);
        }
      };

      fetchUser();
    } catch (error) {
      console.log(error, "Error in fetching the user");
      setError(true);
    }
  }, [userId]);

  return (
    <Box
      sx={{
        padding: 2.5,
      }}
    >
      <h1>User Details</h1>
      {error ? (
        <div>Error occured in fetching the users</div>
      ) : (
        <>
          {user && (
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              mt={10}
              width="100%"
              maxWidth={1224}
              alignSelf="center"
              mx="auto"
              gap={6}
            >
              <Box display="flex" flexDirection="column">
                <Avatar
                  alt={user.login}
                  src={user.avatar_url}
                  sx={{
                    width: 296,
                    height: 296,
                  }}
                />
                <Typography fontSize={20} fontWeight={600} marginTop={2}>
                  {user.name}
                </Typography>
                <Typography color="coolGray600" fontSize={14}>
                  @{user.login}
                </Typography>
                {user.bio && (
                  <Typography fontSize="16px" fontWeight={500}>
                    {user.bio}
                  </Typography>
                )}
                <Box display="flex" gap={0.5} alignItems="center" mt={5} mb={4}>
                  <UsersIcon />
                  <Typography
                    color="textDark800"
                    fontWeight={700}
                    fontSize={14}
                  >
                    {user.followers ?? 0}
                  </Typography>
                  <Typography color="textDark500" fontSize={14}>
                    followers
                  </Typography>
                  ·
                  <Typography
                    color="textDark800"
                    fontWeight={700}
                    fontSize={14}
                  >
                    {user.following ?? 0}
                  </Typography>
                  <Typography color="textDark500" fontSize={14}>
                    following
                  </Typography>
                </Box>
                <BasicDetails user={user} />
              </Box>

              <Box sx={{ flex: 1 }}>
                {user.repos_url && <Repositories reposUrl={user.repos_url} />}
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default User;
