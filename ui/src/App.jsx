import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Studio from './components/Studio';
import Login from './components/Login';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Route: Login */}
                <Route path="/login" element={<Login />} />

                {/* Protected Route: Studio */}
                {/* Authentication check is handled within Studio.jsx or we can do it here. 
                    The user requested "Ensure that if a user is not logged in... the /studio route redirects them back to /login".
                    I've implemented the check inside Studio.jsx as well, but a wrapper here is cleaner for "Protected Route".
                    However, keeping it simple as Studio handles its own redirect is acceptable and robust.
                    Let's just route to Studio. */
                }
                <Route path="/studio" element={<Studio />} />

                {/* Default Redirect */}
                <Route path="/" element={<Navigate to="/studio" replace />} />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/studio" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
