import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { basename, dirname } from 'path'

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
 * @param {string} app
 * @returns {Promise<string[]>}
 */
const getDeps = async (app) => {
	const cwd = process.cwd()
	const list = await execute(`pnpm list --filter ${app}... --json --depth -1`)
	const deps = JSON.parse(list).map((dep) => dep.path.replace(cwd, '').substring(1))
	return deps
}

/**
 *
 * @param {string[]} deps
 * @param {string[]} changes
 * @returns {boolean}
 */
const hasChanges = (deps, changes) => {
	const detector = new RegExp(`^(${deps.join('|')})`)
	return changes.filter((change) => detector.test(change)).length > 0
}

const SHA1 = process.env.NX_HEAD ?? 'HEAD'
// const SHA2 = process.env.NX_BASE ?? 'HEAD~1'
const SHA2 = '8f09d73ab83de2aadcd28a142f7d109a8e2d1590'

const changes = (await execute(`git diff --name-only ${SHA1} ${SHA2}`)).trim().split('\n')
const apps = JSON.parse(await execute('pnpm list --filter "./apps/*" --json --depth -1')).map((app) => app.name)

const appsToBuild = []

for (let app of apps) {
	const deps = await getDeps(app)
	if (hasChanges(deps, changes)) appsToBuild.push(app)
}

process.stdout.write(`output=${appsToBuild.join(',')}`)
