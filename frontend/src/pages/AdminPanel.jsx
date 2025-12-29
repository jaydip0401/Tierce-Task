import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import Layout from '../components/Layout'
import Alert from '../components/Alert'
import Loading from '../components/Loading'

const AdminPanel = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [currentPage, searchTerm])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await api.get('/admin/users', {
        params: {
          page: currentPage,
          limit: 10,
          search: searchTerm
        }
      })
      setUsers(response.data.users)
      setPagination(response.data.pagination)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (userId) => {
    setUpdating(userId)
    setError('')
    setMessage('')
    try {
      const response = await api.patch(`/admin/users/${userId}/toggle-status`)
      setMessage(response.data.message)
      fetchUsers()
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update user status')
    } finally {
      setUpdating(null)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchUsers()
  }

  return (
    <Layout title="Admin Panel">
      <div className="space-y-6">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">User Management</h1>
              <p className="text-indigo-100">Manage all users and their account status</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">All Users</h2>
            <p className="text-sm text-gray-600 mt-1">Total: {pagination.total} users</p>
          </div>

          <div className="p-8">
            {message && <Alert type="success" message={message} onClose={() => setMessage('')} />}
            {error && <Alert type="error" message={error} onClose={() => setError('')} />}

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by email or name..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search</span>
                </button>
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('')
                      setCurrentPage(1)
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>

            {/* Users Table */}
            {loading ? (
              <Loading message="Loading users..." />
            ) : users.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((userItem) => (
                        <tr key={userItem.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                                  {userItem.fullName.charAt(0).toUpperCase()}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900">{userItem.fullName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{userItem.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              userItem.role === 'ADMIN'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            }`}>
                              {userItem.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              userItem.isActive
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                            }`}>
                              {userItem.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(userItem.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleToggleStatus(userItem.id)}
                              disabled={updating === userItem.id || userItem.id === user?.id}
                              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                                userItem.isActive
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {updating === userItem.id ? (
                                <span className="flex items-center">
                                  <svg className="animate-spin h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Updating...
                                </span>
                              ) : userItem.id === user?.id ? (
                                'Current User'
                              ) : userItem.isActive ? (
                                'Deactivate'
                              ) : (
                                'Activate'
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-700">
                      Showing <span className="font-semibold">{((currentPage - 1) * pagination.limit) + 1}</span> to{' '}
                      <span className="font-semibold">{Math.min(currentPage * pagination.limit, pagination.total)}</span> of{' '}
                      <span className="font-semibold">{pagination.total}</span> results
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-sm font-semibold text-gray-700">
                        Page {currentPage} of {pagination.totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                        disabled={currentPage === pagination.totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminPanel
