import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2, Shield, ShieldOff, AlertCircle } from 'lucide-react';
import axios from 'axios';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://higherpolynomial-node.vercel.app/api/admin/users');
            setUsers(response.data.users || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users");
            setLoading(false);
        }
    };

    const handleToggleBlockUser = async (user) => {
        const action = user.is_blocked ? "unblock" : "block";
        if (!confirm(`Are you sure you want to ${action} this user?`)) return;

        try {
            await axios.patch(`https://higherpolynomial-node.vercel.app/api/admin/users/${user.id}/block`);
            toast.success(`User ${action}ed successfully`);
            fetchUsers();
        } catch (error) {
            toast.error(`Error ${action}ing user`);
        }
    };

    const handleToggleCourseBlock = async (user, course) => {
        const action = course.status === 'blocked' ? "unblock" : "block";
        if (!confirm(`Are you sure you want to ${action} this user from ${course.course_title}?`)) return;

        try {
            await axios.patch(`https://higherpolynomial-node.vercel.app/api/admin/users/${user.id}/courses/${course.course_id}/block`);
            toast.success(`User course access updated`);
            fetchUsers();
        } catch (error) {
            toast.error("Error updating course access");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm("Are you sure you want to PERMANENTLY delete this user? This cannot be undone.")) return;

        try {
            await axios.delete(`https://higherpolynomial-node.vercel.app/api/admin/users/${userId}`);
            toast.success("User deleted permanently");
            fetchUsers();
        } catch (error) {
            toast.error("Error deleting user");
        }
    };

    if (loading) return <div className="text-center py-12">Loading users...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
                <p className="mt-2 text-gray-600">Overview of all registered students</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">User Info</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Enrolled Courses</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className={`hover:bg-gray-50 transition ${user.is_blocked ? 'bg-red-50' : ''}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                                <div className="text-xs text-gray-400">ID: {user.id} | Mobile: {user.mobile_number}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            {user.enrolled_courses && user.enrolled_courses.length > 0 ? (
                                                user.enrolled_courses.map((course) => (
                                                    <div key={course.course_id} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded border border-gray-200">
                                                        <span className={course.status === 'blocked' ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}>
                                                            {course.course_title}
                                                        </span>
                                                        <button
                                                            onClick={() => handleToggleCourseBlock(user, course)}
                                                            className={`ml-2 px-2 py-0.5 rounded text-[10px] uppercase font-bold ${course.status === 'blocked'
                                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                                }`}
                                                        >
                                                            {course.status === 'blocked' ? 'Unblock' : 'Block'}
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 text-xs italic">No enrollments</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.is_blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {user.is_blocked ? (
                                                <><AlertCircle size={12} className="mr-1" /> Blocked</>
                                            ) : (
                                                "Active"
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleToggleBlockUser(user)}
                                                title={user.is_blocked ? "Unblock User" : "Block User"}
                                                className={`p-2 rounded-lg transition ${user.is_blocked
                                                        ? 'bg-green-50 text-green-600 hover:bg-green-100'
                                                        : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                                                    }`}
                                            >
                                                {user.is_blocked ? <Shield size={18} /> : <ShieldOff size={18} />}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                title="Delete User"
                                                className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
