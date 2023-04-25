export function paginate(items, pageNo, pageSize) {
    const startIndex = (pageNo - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
}
