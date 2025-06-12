import React, { useContext, useState } from 'react';
import { MyContext } from '../../MyContext/Mycontext';

const ChangePassword = () => {
    const { API_BASE_URL } = useContext(MyContext);

    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPasswords, setShowPasswords] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            alert('New password and confirm password do not match.');
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem('token'); // Make sure token exists

            const res = await fetch(`${API_BASE_URL}/admin/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({
                    oldPassword: form.oldPassword,
                    newPassword: form.newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to change password');
            }

            alert('Password changed successfully!');
            setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            alert(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-center text-[#51a2ff]">Change Password</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                        Old Password
                    </label>
                    <input
                        type={showPasswords ? 'text' : 'password'}
                        name="oldPassword"
                        id="oldPassword"
                        value={form.oldPassword}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#51a2ff] focus:border-[#51a2ff]"
                    />
                </div>

                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type={showPasswords ? 'text' : 'password'}
                        name="newPassword"
                        id="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#51a2ff] focus:border-[#51a2ff]"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type={showPasswords ? 'text' : 'password'}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#51a2ff] focus:border-[#51a2ff]"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="showPasswords"
                        checked={showPasswords}
                        onChange={() => setShowPasswords(!showPasswords)}
                        className="mr-2"
                    />
                    <label htmlFor="showPasswords" className="text-sm text-gray-600">
                        Show Passwords
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-[#51a2ff] text-white py-2 px-4 rounded-lg transition hover:bg-[#3e91e0] ${loading && 'opacity-50 cursor-not-allowed'}`}
                >
                    {loading ? 'Changing...' : 'Change Password'}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
