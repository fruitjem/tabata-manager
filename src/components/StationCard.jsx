import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function StationCard({ name, exercise }) {
  return (
    <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        {exercise ? (
          <>
            <Typography variant="subtitle1" gutterBottom>
              {exercise.name}
            </Typography>
            <CardMedia
              component="img"
              height="160"
              image={exercise.gif}
              alt={exercise.name}
              sx={{ borderRadius: 1, objectFit: 'cover' }}
            />
          </>
        ) : (
          <Typography variant="subtitle2">✓ Fine esercizi</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default StationCard;
