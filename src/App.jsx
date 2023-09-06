import React from "react";
import GroupCreatorView from "./features/groupsCreator/views/GroupCreatorView/GroupCreatorView";
import FadeIn from "./common/components/animations/FadeIn";

const App = () => {
  return (
    <>
      <FadeIn distance={"400px"}>
        <GroupCreatorView />
      </FadeIn>
    </>
  );
};

export default App;
