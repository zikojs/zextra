function getNumbering(treeView, targetItem) {
    if (!treeView.isTreeView) return null;
    function findPath(items, target, currentPath = []) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (!item.isTreeItem) continue;
            const newPath = [...currentPath, i + 1];
            if (item === target) {
                return newPath.join('.');
            }
            if (item.items && item.items.length > 0) {
                const result = findPath(item.items, target, newPath);
                if (result) return result;
            }
        }
        return null;
    }
    return findPath(treeView.items, targetItem);
}
