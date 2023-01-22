import { exec } from 'child_process'
import { basename, dirname } from 'path'
import { fileURLToPath } from 'url'

/**
 * @param {string} cmd
 * @returns {Promise<string>}
 */
const execute = (cmd) => {
	return new Promise((resolve, reject) => {
		exec(cmd, (err, stdout) => {
			if (err) reject(err)
			else resolve(stdout)
		})
	})
}

/**
 *
 * @param {'backend' | 'frontend'} app
 * @returns {Promise<string[]>}
 */
const getDeps = async (app) => {
	const cwd = process.cwd()
	const list = await execute(`pnpm list --filter ${app}... --json --depth -1`)
	const deps = JSON.parse(list)
		.map((dep) => dep.path.replace(cwd, ''))
		.filter((dep) => dep !== `/apps/${app}`)
	return deps
}

const diff = await execute('git diff --name-only HEAD 8f09d73')
const filesChanged = diff.trim().split('\n')

console.log(filesChanged)
console.log(await getDeps('backend'))
