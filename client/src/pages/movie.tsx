interface IMovie {
  match: {
    params: {
      name: string;
    };
  };
}
export const Movie = ({ match }: IMovie) => {
  return <div>Hello from Movie: {match.params.name}</div>;
};
