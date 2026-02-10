import { db } from '../lib/db.js';
import { signAccessToken } from '../utils/jwt.util.js';

export async function login(username, password) {
	await db.read()

	const user = b.data.user.find(u => u.username == username && u.password == password)

	if (!user) return null

	const accessToken = signAccessToken({sub: user.id, username: user.username, role: user.role})

	return {accessToken, user: {id: user.id, username: user.username, role: user.role}}
}
