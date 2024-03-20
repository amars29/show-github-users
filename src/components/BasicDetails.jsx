import React from "react";
import {
  CompanyIcon,
  EmailIcon,
  LinkIcon,
  LocationIcon,
  TwitterIcon,
} from "./icons";
import { Box, Typography } from "@mui/material";

function BasicDetails({ user }) {
  const data = [
    {
      name: user.company,
      Icon: <CompanyIcon />,
    },
    {
      name: user.location,
      Icon: <LocationIcon />,
    },
    {
      name: user.html_url,
      Icon: <LinkIcon />,
      href: user.html_url,
      link: true,
    },
    {
      name: user.twitter_username,
      Icon: <TwitterIcon />,
    },
    {
      name: user.email,
      Icon: <EmailIcon />,
      href: `mailto:${user.email}`,
      link: true,
    },
  ];

  return data.map((item) => {
    if (!item.name) return;
    return (
      <Box display="flex" gap={0.5} alignItems="center" key={item.name}>
        {item.Icon}
        {item.link ? (
          <a href={item.href}>
            <RenderName item={item} />
          </a>
        ) : (
          <RenderName item={item} />
        )}
      </Box>
    );
  });
}

const RenderName = ({ item }) => {
  return (
    <Typography color="textDark800" fontWeight={500} fontSize={14}>
      {item.name ?? 0}
    </Typography>
  );
};

export default BasicDetails;
