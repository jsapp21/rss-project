import React, { useEffect, useState } from 'react';
import { userPropTypes } from '../propTypes/schema';

const User = ({ user }) => {
  return <div>user</div>;
};

export default User;

User.propTypes = {
  user: userPropTypes.isRequired,
};
