import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Skeleton,
} from "@mui/material";
import React from "react";

const ReuseableCard = ({ title, actions, children, skeletonWidth, isLoading, ...props }) => {
  return isLoading ? (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 24px 0 rgba(25, 71, 219, 0.10)",
        width: window.innerWidth > 901 ? "350px" : "96%",
        p: 2,
      }}
    >
      <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" height={80} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="rectangular" width="40%" height={20} />
      <CardActions sx={{width: "100%", display: "flex", justifyContent: "flex-end", paddingRight:"20px"}} >
        <Skeleton variant="rectangular" width={100} height={36} />
      </CardActions>
    </Card>
  ) : (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 24px 0 rgba(25, 71, 219, 0.10)",
        width: "350px",
      }}
      {...props}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1947DB" }}>
          {title}
        </Typography>
        {children}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default ReuseableCard;
