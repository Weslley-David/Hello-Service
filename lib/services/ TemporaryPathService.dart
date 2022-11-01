import 'dart:io';

import 'package:path_provider/path_provider.dart';

class TemporaryPathService {
  Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();

    return directory.path;
  }

  Future<File> get _localFile async {
    final path = await _localPath;
    return File("$path/counter.wav");
  }

  Future<File> writeAudio(int counter) async {
    final file = await _localFile;

    return file.writeAsString('$counter');
  }

  Future<int> readCounter() async {
    try {
      final file = await _localFile;

      // Ler Arquivo
      final contents = await file.readAsString();

      return int.parse(contents);
    } catch (e) {
      return 0;
    }
  }
}
