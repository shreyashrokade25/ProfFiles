import React, { createContext, useState } from 'react';

export const AchievementContext = createContext();

export const AchievementProvider = ({ children }) => {
 const [achievementData, setAchievementData] = useState(null);

 return (
    <AchievementContext.Provider value={{ achievementData, setAchievementData }}>
      {children}
    </AchievementContext.Provider>
 );
};
