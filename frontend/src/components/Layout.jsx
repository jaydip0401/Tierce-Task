import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Layout = ({ children, title }) => {
  const { logout, isAdmin, user } = useAuth()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    User Management
                  </h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Professional Dashboard</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => navigate('/dashboard')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  title === 'Dashboard'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    title === 'Admin Panel'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Admin Panel
                </button>
              )}
            </div>

            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
              {/* User Info */}
              {user && (
                <div className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-blue-50/50 px-4 py-2 rounded-xl border border-gray-200/50">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">{user.email}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${
                    user.role === 'ADMIN'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                  }`}>
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}

              {/* User Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${
                    user?.role === 'ADMIN'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                  }`}>
                    {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <svg className={`w-5 h-5 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20">
                      {/* User Info in Dropdown */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">{user?.fullName}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            user?.role === 'ADMIN'
                              ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800'
                              : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800'
                          }`}>
                            {user?.role === 'ADMIN' && (
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                            {user?.role}
                          </span>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={() => {
                            navigate('/dashboard')
                            setShowUserMenu(false)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span>Dashboard</span>
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => {
                              navigate('/admin')
                              setShowUserMenu(false)
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span>Admin Panel</span>
                          </button>
                        )}
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout
