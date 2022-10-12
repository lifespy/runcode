import Docker, { Container } from 'dockerode';
import fs from 'fs';
import dockerConfig from '../config/docker';
import * as cpp from './cpp';

const env: string[] = ['cpp:11'];

const docker = new Docker({
  ...dockerConfig,
});

export async function init() {
  // const images = await docker.listImages();

  // const imagesSet = new Set<string>(
  //   images.reduce<string[]>((acc, cur) => {
  //     if (cur.RepoTags) {
  //       acc = acc.concat(cur.RepoTags);
  //     }
  //     return acc;
  //   }, [])
  // );

  // const notBuildEnv = env.filter((env) => !imagesSet.has(env));

  await Promise.all(
    env.map(async (env) => {
      if (env.includes('cpp')) {
        const version = env.split(':')[1];
        return await cpp.buildImage({ version });
      }
      return await Promise.resolve();
    })
  );
}

export async function run({ image, code }: { image: string; code: string }) {
  return await new Promise((resolve, reject) => {
    docker
      .run(
        image,
        [
          'bash',
          '-c',
          `cat > code.cpp << EOF ${code} \
          g++ code.cpp -o code.out \
          && ./code.out`,
        ],
        process.stdout
      )
      .then(async function (data) {
        const output = data[0];
        const container: Container = data[1];
        const readstream = await container.logs({ stdout: true, stderr: true });
        container.remove();
        resolve(readstream.toString());
        return output;
      })
      .then(function (data) {
        console.log('container removed');
        return data;
      })
      .catch(function (error) {
        console.log(error, 'err');

        resolve(error);
      });
  });
}
