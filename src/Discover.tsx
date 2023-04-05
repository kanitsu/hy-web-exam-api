const styles = {
    image: {
        width: '100%',
        flexGrow: 1,
    },
};

export function Discover(): JSX.Element {
    return (
        <>
            <img src='/explore.jpg' style={styles.image} />
        </>
    );
}