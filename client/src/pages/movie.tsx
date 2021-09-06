interface IMovie {
  match: {
    params: {
      slug: string;
    };
  };
}
export const Movie = ({ match }: IMovie) => {
  return <div>Hello from Movie: {match.params.slug}</div>;
};
