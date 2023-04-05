const styles = {
    image: {
        position: 'absolute' as 'absolute',
        top: 0,
        width: '100%',
    },
};

export function Discover(): JSX.Element {
    return (
        <img src='/explore.jpg' style={styles.image} />
    );
}
