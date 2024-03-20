import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Repositories({ reposUrl }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(reposUrl);
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    }

    fetchRepos();
  }, [reposUrl]);

  return (
    <Box>
      <Typography fontSize={20} fontWeight={700}>
        Repositories
      </Typography>
      <Grid container spacing={2}>
        {repos.map((repo) => {
          return (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={repo.id}
              sx={{
                textDecoration: "none",
              }}
            >
              <a
                href={repo.svn_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {repo.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {repo.description || "No description provided"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Stars: {repo.stargazers_count}, Forks: {repo.forks_count}
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Repositories;
