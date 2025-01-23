export function ghActionsBranch(env) {
    return env.GITHUB_REF ? env.GITHUB_REF.split('/').slice(-1)[0] : "";
}
