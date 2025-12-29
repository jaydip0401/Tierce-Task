import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Verify token by fetching user profile
      fetchUserProfile()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/user/profile')
      setUser(response.data.user)
    } catch (error) {
      // Token invalid, clear it
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { user, token } = response.data
      localStorage.setItem('token', token)
      setToken(token)
      setUser(user)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return { success: true, user }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      }
    }
  }

  const register = async (fullName, email, password, role) => {
    try {
      const response = await api.post('/auth/register', {
        fullName,
        email,
        password,
        role
      })
      const { user, token } = response.data
      localStorage.setItem('token', token)
      setToken(token)
      setUser(user)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete api.defaults.headers.common['Authorization']
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN'
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

