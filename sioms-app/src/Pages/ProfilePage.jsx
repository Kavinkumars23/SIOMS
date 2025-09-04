import React, { Component } from 'react'
import MainLayout from '../Components/Layout/MainLayout';

class ProfilePage extends Component {
  render() {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
          <p className="text-lg text-gray-700">This is the profile page content.</p>
          {/* Add more profile related content here */}
        </div>
      </MainLayout>
    )
  }
}


export default ProfilePage;
