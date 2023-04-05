const styles = {
    container: {
        position: 'fixed' as 'fixed',
        bottom: 30,
        width: '100%',
        height: 3,
        backgroundColor: '#000',
    },
    content: {
        height: 3,
        backgroundColor: '#fff',
    },
};

interface Props {
    progress: number;
}
export function ProgressBar({ progress }: Props): JSX.Element {
    console.log(progress)
    return (
        <div style={styles.container}>
            <div style={{ ...styles.content, width: progress + '%' }} />
        </div>
    );
}