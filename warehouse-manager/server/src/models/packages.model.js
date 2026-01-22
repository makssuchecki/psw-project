let packages = []

export const getAll = () => packages

export const create = (pack) => {
    packages.push(pack)
    return pack
}

