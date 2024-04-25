import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { AccessDeniedScreen } from 'supertokens-auth-react/recipe/session/prebuiltui';
import { UserRoleClaim } from 'supertokens-auth-react/recipe/userroles';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { PreBuiltUIList, SuperTokensConfig, ComponentWrapper } from './config';

import {
    MainLayout,
    AdminLayout
} from "./pages/_layout";

import {
    Home,
    AdminDashboard,
    StoredSong,
    SongUploadForm,
    SongEdit,
//   Browse,
//   Genre,
//   Artist,
//   FavouritePlaylists,
//   Playlist,
//   Search,
//   MyPlaylists,
//   MyPlaylist,
//   Profile,
//   Notifications,
  Error,
} from "./pages/_root";



SuperTokens.init(SuperTokensConfig);

const AdminRoute = (props) => {
    return (
        <SessionAuth
            accessDeniedScreen={AccessDeniedScreen}
            overrideGlobalClaimValidators={(globalValidators) => [
                ...globalValidators,
                UserRoleClaim.validators.includes('Admin'),
            ]}
        >
            {props.children}    
        </SessionAuth>
    );
};

function App() {
    return (
        <SuperTokensWrapper>
            <ComponentWrapper>
                <div className="App app-container">
                    <Router>
                        <div className="fill">
                            <Routes>
                            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                                <Route index element={<StoredSong />} />
                                <Route path="song/create" element={<SongUploadForm />} />
                                <Route path="song/:id" element={<SongEdit />} />
                            </Route>

                                {/* This shows the login UI on "/auth" route */}
                                {getSuperTokensRoutesForReactRouterDom(require('react-router-dom'), PreBuiltUIList)}

                                <Route path="/" element={<MainLayout/>}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="playlist" element={<SessionAuth></SessionAuth>} />
                                </Route>

                                <Route path="*" element={<Error />} />
                            </Routes>
                        </div>
                    </Router>
                </div>
            </ComponentWrapper>
        </SuperTokensWrapper>
    );
}

export default App;
