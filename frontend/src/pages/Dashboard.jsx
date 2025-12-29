import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import Layout from '../components/Layout'
import Alert from '../components/Alert'
import Loading from '../components/Loading'

const Dashboard = () => {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/user/profile')
      setProfile(response.data.user)
      setFormData({ fullName: response.data.user.fullName, password: '', confirmPassword: '' })
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password && formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setUpdating(true)
    try {
      const updateData = { fullName: formData.fullName }
      if (formData.password) {
        updateData.password = formData.password
      }

      const response = await api.put('/user/profile', updateData)
      setProfile(response.data.user)
      setMessage('Profile updated successfully')
      setEditMode(false)
      setFormData({ ...formData, password: '', confirmPassword: '' })
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <Layout title="Dashboard">
        <Loading message="Loading profile..." />
      </Layout>
    )
  }

  const memberSince = profile?.createdAt ? new Date(profile.createdAt) : new Date()
  const daysSince = Math.floor((new Date() - memberSince) / (1000 * 60 * 60 * 24))

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium mb-1">Welcome back,</p>
                  <h1 className="text-3xl font-bold mb-2">{profile?.fullName || 'User'}</h1>
                  <p className="text-blue-100 text-sm">Manage your profile and account settings</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Account Status</h3>
              <div className={`w-3 h-3 rounded-full ${profile?.isActive ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold ${
                  profile?.isActive
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
                    : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800'
                }`}>
                  {profile?.isActive ? '✓ Active' : '✗ Inactive'}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Member Since</p>
                <p className="text-sm font-semibold text-gray-900">{daysSince} days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 via-blue-50/50 to-indigo-50/50 px-8 py-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profile Information</span>
                </h2>
                <p className="text-sm text-gray-600 mt-1">View and manage your account details</p>
              </div>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-8">
            {message && <Alert type="success" message={message} onClose={() => setMessage('')} />}
            {error && <Alert type="error" message={error} onClose={() => setError('')} />}

            {editMode ? (
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      value={profile?.email}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-gray-500 flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Email cannot be changed</span>
                    </p>
                  </div>
                </div>

                <div className="border-t-2 border-gray-100 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Change Password</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password (optional)</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50"
                        placeholder="Leave blank to keep current"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center space-x-2"
                  >
                    {updating ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false)
                      setError('')
                      setFormData({ fullName: profile?.fullName || '', password: '', confirmPassword: '' })
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full Name</label>
                      <p className="text-lg font-bold text-gray-900">{profile?.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email Address</label>
                      <p className="text-lg font-bold text-gray-900">{profile?.email}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        profile?.role === 'ADMIN'
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      }`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Role</label>
                      <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold ${
                        profile?.role === 'ADMIN'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      }`}>
                        {profile?.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        profile?.isActive
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                          : 'bg-gradient-to-br from-red-500 to-pink-500'
                      }`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Account Status</label>
                      <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold ${
                        profile?.isActive
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                          : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      }`}>
                        {profile?.isActive ? '✓ Active' : '✗ Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-100">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Member Since</label>
                      <p className="text-lg font-bold text-gray-900">
                        {new Date(profile?.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        {isAdmin && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Quick Actions</span>
            </h3>
            <button
              onClick={() => navigate('/admin')}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Go to Admin Panel</span>
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Dashboard
